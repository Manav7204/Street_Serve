from sqlalchemy import create_engine,text
from sqlalchemy.orm import sessionmaker
# New (correct):
from sqlalchemy.orm import declarative_base


# Replace with your actual DB credentials
DATABASE_URL = "postgresql://postgres:722004@localhost:5432/Street_Serve"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
try:
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        print("✅ Database connection successful!")
except Exception as e:
    print("❌ Connection failed:", e)