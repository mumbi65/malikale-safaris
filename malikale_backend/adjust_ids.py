import json

# Configuration
input_file = 'db_cleaned.json'  # Input JSON file
output_file = 'db_cleaned_updated.json'  # Output JSON file
id_offset = 100  # Value to increment IDs by

# List of boolean fields to correct (specific to your model structure)
boolean_fields = ['is_staff', 'is_superuser', 'is_active']

try:
    # Load the JSON file
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Update the IDs for entries and handle boolean fields
    for entry in data:
        # Update primary keys
        if 'pk' in entry:  # Check if the entry has a primary key
            if isinstance(entry['pk'], int):
                entry['pk'] += id_offset  # Increment the ID by the offset
        
        # Update foreign keys and handle boolean fields
        if 'fields' in entry:
            for key, value in entry['fields'].items():
                # Update foreign key fields if they are integers
                if isinstance(value, int):
                    entry['fields'][key] += id_offset
                
                # Correct boolean fields
                if key in boolean_fields:
                    entry['fields'][key] = True if str(value).lower() in ['true', '1', 't', 'y', 'yes'] else False

    # Save the updated data back into a new JSON file
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

    print(f"IDs and boolean fields updated successfully! Saved to {output_file}")

except Exception as e:
    print(f"Error: {e}")
