CREATE OR REPLACE FUNCTION delete_note(p_id INTEGER)
RETURNS VOID AS $$
BEGIN
  DELETE FROM notes WHERE id = p_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Note with ID % not found', p_id;
  END IF;
END;
$$ LANGUAGE plpgsql;