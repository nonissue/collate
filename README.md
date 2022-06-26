# Collate

## API Design

### HTTP Status Codes

#### Failed unique constraint

- For example, trying to create the category 'books' when 'books' is already an existing category.
- Note: In some cases, like with the 'category' model, the unique constraint is case-insensitive.
  - Actually, is it?
