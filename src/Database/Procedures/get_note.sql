CREATE OR REPLACE FUNCTION get_all_notes()
RETURNS TABLE(id INT, title TEXT, content TEXT, created_at TIMESTAMP)
LANGUAGE sql AS $$
SELECT id, title, content, created_at FROM notes;
$$;

CREATE OR REPLACE FUNCTION get_note_by_id(p_id INT)
RETURNS TABLE(id INT, title TEXT, content TEXT, created_at TIMESTAMP)
LANGUAGE sql AS $$
SELECT id, title, content, created_at FROM notes WHERE id = p_id;
$$;