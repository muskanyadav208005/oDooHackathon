-- ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
-- (Postgres-specific RLS statement commented out to avoid syntax issues in other SQL dialects)
-- (Postgres-specific RLS statements commented out to avoid syntax issues in other SQL dialects)

-- CREATE POLICY admin_can_view_audit_logs
-- ON public.audit_logs
-- FOR SELECT
-- USING (
--     public.get_user_role() = 'Admin'
-- );

-- CREATE POLICY analyst_can_view_audit_logs
-- ON public.audit_logs
-- FOR SELECT
-- USING (
--     public.get_user_role() = 'Analyst'
-- );

-- CREATE POLICY driver_view_own_logs
-- ON public.audit_logs
-- FOR SELECT
-- USING (
--     user_id = auth.uid()
-- );

