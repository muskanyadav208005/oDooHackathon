CREATE TABLE expenses (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    trip_id UUID
    REFERENCES trips(id)
    ON DELETE CASCADE,

    category TEXT,

    description TEXT,

    amount NUMERIC NOT NULL
    CHECK(amount>=0),

    expense_date DATE DEFAULT CURRENT_DATE,

    created_at TIMESTAMP DEFAULT NOW()
);