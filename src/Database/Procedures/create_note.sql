
CREATE OR REPLACE FUNCTION create_note(IN p_title TEXT, IN p_content TEXT)
LANGUAGE plpgsql AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM notes WHERE title = p_title) THEN
    RAISE EXCEPTION 'Note title already exists';
  END IF;
  INSERT INTO notes (title, content, created_at) VALUES (p_title, p_content, NOW());
END;
$$;