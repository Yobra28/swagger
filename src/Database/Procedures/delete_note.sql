CREATE OR REPLACE PROCEDURE delete_note_by_id(IN p_id INT)
LANGUAGE plpgsql AS $$
BEGIN
  DELETE FROM notes WHERE id = p_id;
END;
$$