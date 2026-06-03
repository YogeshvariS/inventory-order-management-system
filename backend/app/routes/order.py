from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.order import Order, OrderItem
from app.models.product import Product
from app.models.customer import Customer
from app.schemas.order import OrderCreate

router = APIRouter(prefix="/orders", tags=["Orders"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def create_order(order_data: OrderCreate):
    db: Session = next(get_db())

    customer = db.query(Customer).filter(
        Customer.id == order_data.customer_id
    ).first()

    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")

    total_amount = 0

    order = Order(
        customer_id=order_data.customer_id,
        total_amount=0
    )

    db.add(order)
    db.commit()
    db.refresh(order)

    for item in order_data.items:

        product = db.query(Product).filter(
            Product.id == item.product_id
        ).first()

        if not product:
            raise HTTPException(
                status_code=404,
                detail=f"Product ID {item.product_id} not found"
            )

        if product.quantity < item.quantity:
            raise HTTPException(
                status_code=400,
                detail=f"Insufficient stock for {product.name}"
            )

        product.quantity -= item.quantity

        item_total = product.price * item.quantity
        total_amount += item_total

        order_item = OrderItem(
            order_id=order.id,
            product_id=product.id,
            quantity=item.quantity,
            price=product.price
        )

        db.add(order_item)

    order.total_amount = total_amount

    db.commit()

    return {
        "message": "Order created successfully",
        "order_id": order.id,
        "total_amount": total_amount
    }

@router.get("/")
def get_orders():
    db: Session = next(get_db())
    return db.query(Order).all()

@router.get("/{order_id}")
def get_order(order_id: int):
    db: Session = next(get_db())

    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    return order

@router.delete("/{order_id}")
def delete_order(order_id: int):
    db: Session = next(get_db())

    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    order_items = db.query(OrderItem).filter(
        OrderItem.order_id == order_id
    ).all()

    # Restore inventory
    for item in order_items:
        product = db.query(Product).filter(
            Product.id == item.product_id
        ).first()

        if product:
            product.quantity += item.quantity

    # Delete order items
    for item in order_items:
        db.delete(item)

    db.delete(order)

    db.commit()

    return {"message": "Order deleted successfully"}