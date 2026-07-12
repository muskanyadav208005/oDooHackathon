CREATE TABLE maintenance_logs (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    vehicle_id UUID
    REFERENCES vehicles(id)
    ON DELETE CASCADE,

    description TEXT,

    maintenance_type TEXT,

    cost NUMERIC DEFAULT 0
    CHECK(cost>=0),

    maintenance_date DATE DEFAULT CURRENT_DATE,

    status TEXT DEFAULT 'Pending'
    CHECK(status IN
    (
        'Pending',
        'Completed'
    )),

    created_at TIMESTAMP DEFAULT NOW()
);