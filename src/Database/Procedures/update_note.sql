CREATE OR REPLACE FUNCTION update_note(
    p_id INTEGER,
    p_title VARCHAR(255),
    p_consent VARCHAR(255)
)
RETURNS TABLE(
    id INTEGER,
    title VARCHAR(255),
    consent VARCHAR(255)
) AS $$
DECLARE
    current_title VARCHAR(255);
BEGIN
    SELECT notes.title INTO current_title 
    FROM notes 
    WHERE notes.id = p_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'note with id % not found', p_id;
    END IF;

    IF p_title IS NOT NULL AND p_title != current_title THEN
        IF EXISTS (SELECT 1 FROM notes WHERE notes.title = p_title AND notes.id != p_id) THEN
            RAISE EXCEPTION 'Another note with this title exists';
        END IF;
    END IF;

    RETURN QUERY
    UPDATE notes SET
        title = COALESCE(p_title, notes.title),
        consent = COALESCE(p_consent, notes.consent)
    WHERE notes.id = p_id
    RETURNING notes.id, notes.title, notes.consent;
END;
$$ LANGUAGE plpgsql;
