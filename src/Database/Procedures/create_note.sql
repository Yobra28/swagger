CREATE OR REPLACE FUNCTION create_note(
    p_title VARCHAR,
    p_consent VARCHAR
)
RETURNS TABLE(
    id INTEGER,
    title VARCHAR,
    consent VARCHAR
) AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM notes WHERE title = p_title) THEN
        RAISE EXCEPTION 'note with title % already exists', p_title;
    END IF;

    RETURN QUERY
    INSERT INTO notes (title, consent)
    VALUES (p_title, p_consent)
    RETURNING id, title, consent;
END;
$$ LANGUAGE plpgsql;