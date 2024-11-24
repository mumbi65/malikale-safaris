# clean_db.py

# Open the original db.json in binary mode to preserve encoding
with open('db.json', 'rb') as f:
    content = f.read()

# Attempt to decode using 'latin1' encoding (or 'windows-1252' if needed)
cleaned_content = content.decode('latin1')  # or 'windows-1252' if 'latin1' doesn't work

# Save the cleaned content back to a new file in UTF-8 encoding
with open('db_cleaned.json', 'w', encoding='utf-8') as f:
    f.write(cleaned_content)

print("File cleaned and saved as db_cleaned.json")
