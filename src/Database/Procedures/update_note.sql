CREATE OR REPLACE PROCEDURE update_note(IN p_id INT, IN p_title TEXT, IN p_content TEXT)
LANGUAGE plpgsql AS $$
BEGIN
  UPDATE notes SET title = p_title, content = p_content WHERE id = p_id;
END;
$$;