CREATE TABLE audit_logs (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID REFERENCES profiles(id),

    entity_type TEXT NOT NULL
    CHECK(entity_type IN (
        'Vehicle',
        'Driver',
        'Trip',
        'Maintenance',
        'Fuel',
        'Expense'
    )),

    entity_id UUID NOT NULL,

    action TEXT NOT NULL,

    old_status TEXT,

    new_status TEXT,

    description TEXT,

    created_at TIMESTAMP DEFAULT NOW()

);