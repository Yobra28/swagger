-- Get all notes
CREATE OR REPLACE FUNCTION get_all_notes()
RETURNS SETOF notes AS $$
BEGIN
    RETURN QUERY SELECT * FROM notes ORDER BY id;
END;
$$ LANGUAGE plpgsql;

-- Get one notes by id
CREATE OR REPLACE FUNCTION get_note_by_id(p_id INTEGER)
RETURNS SETOF notes AS $$
BEGIN
    RETURN QUERY SELECT * FROM notes WHERE id = p_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION ' note with id % not found', p_id;
    END IF;
END;
$$ LANGUAGE plpgsql;