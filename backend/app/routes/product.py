from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductResponse

router = APIRouter(prefix="/products", tags=["Products"])

# DB session helper
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=ProductResponse)
def create_product(product: ProductCreate):
    db: Session = next(get_db())

    existing_product = db.query(Product).filter(Product.sku == product.sku).first()

    if existing_product:
        raise HTTPException(status_code=400, detail="SKU already exists")

    new_product = Product(
        name=product.name,
        sku=product.sku,
        price=product.price,
        quantity=product.quantity
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product

@router.get("/")
def get_products():
    db: Session = next(get_db())
    return db.query(Product).all()

@router.get("/{product_id}")
def get_product(product_id: int):
    db: Session = next(get_db())

    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return product

@router.put("/{product_id}")
def update_product(product_id: int, updated_product: ProductCreate):
    db: Session = next(get_db())

    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    existing_sku = db.query(Product).filter(
        Product.sku == updated_product.sku,
        Product.id != product_id
    ).first()

    if existing_sku:
        raise HTTPException(status_code=400, detail="SKU already exists")

    product.name = updated_product.name
    product.sku = updated_product.sku
    product.price = updated_product.price
    product.quantity = updated_product.quantity

    db.commit()
    db.refresh(product)

    return product

@router.delete("/{product_id}")
def delete_product(product_id: int):
    db: Session = next(get_db())

    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    db.delete(product)
    db.commit()

    return {"message": "Product deleted successfully"}