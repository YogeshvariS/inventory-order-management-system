from fastapi import FastAPI
from app.database import engine, Base
from app.models.product import Product
from app.routes.product import router as product_router
from app.models.customer import Customer
from app.routes.customer import router as customer_router
from app.models.order import Order, OrderItem
from app.routes.order import router as order_router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(product_router)
app.include_router(customer_router)
app.include_router(order_router)

@app.get("/")
def root():
    return {"message": "Inventory Management API Running"}