# How the "Get In Touch" Contact Form Works

## Overview
The contact form allows visitors to send messages that are stored in the database. Here's how it works end-to-end:

## Frontend Flow (React Component)

### 1. **Form Component** (`frontend/src/components/Contact.tsx`)

**Form Fields:**
- **Name** (required) - Text input
- **Email** (required) - Email input with validation
- **Subject** (optional) - Text input
- **Message** (required) - Textarea

**State Management:**
```typescript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  subject: '',
  message: ''
})
const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
```

**Form Submission Process:**
1. User fills out the form
2. Clicks "Send Message" button
3. Form validation (HTML5 required fields)
4. `handleSubmit` function is called
5. Status changes to 'sending'
6. POST request sent to `/api/contacts`
7. On success: Form clears, shows "Message Sent!" for 3 seconds
8. On error: Shows error message

### 2. **API Request**
```typescript
POST /api/contacts
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Hello",
  "message": "This is my message"
}
```

## Backend Flow (Spring Boot)

### 1. **Controller** (`PortfolioController.java`)

**Endpoint:** `POST /api/contacts`

**Process:**
1. Receives JSON data from frontend
2. Creates a `Contact` entity object
3. Sets `createdAt` timestamp automatically if not provided
4. Calls `portfolioService.saveContact()`
5. Returns HTTP 201 (Created) with saved contact

**Code:**
```java
@PostMapping("/contacts")
public ResponseEntity<Contact> saveContact(@RequestBody Contact contact) {
    if (contact.getCreatedAt() == null) {
        contact.setCreatedAt(java.time.LocalDateTime.now());
    }
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(portfolioService.saveContact(contact));
}
```

### 2. **Service Layer** (`PortfolioService.java`)

**Method:** `saveContact(Contact contact)`

**Process:**
1. Receives contact entity
2. Calls `contactRepository.save(contact)`
3. Returns saved contact (with generated ID)

### 3. **Repository Layer** (`ContactRepository.java`)

**Interface:** Extends `JpaRepository<Contact, Long>`

**Process:**
1. Spring Data JPA automatically handles:
   - Generating unique ID
   - Inserting into database
   - Returning saved entity

### 4. **Database** (H2 In-Memory)

**Table:** `contact`

**Columns:**
- `id` (Long, auto-generated)
- `name` (String, required)
- `email` (String, required)
- `subject` (String, optional)
- `message` (TEXT, required)
- `created_at` (LocalDateTime, auto-set)
- `read` (Boolean, default: false)

## Data Flow Diagram

```
User fills form
    ↓
Frontend validates (HTML5)
    ↓
POST /api/contacts
    ↓
PortfolioController.saveContact()
    ↓
Sets createdAt timestamp
    ↓
PortfolioService.saveContact()
    ↓
ContactRepository.save()
    ↓
H2 Database (contact table)
    ↓
Returns saved Contact
    ↓
Frontend shows success message
```

## Viewing Submitted Contacts

### Via API:
```bash
GET /api/contacts
```

Returns all contacts sorted by creation date (newest first).

### Via H2 Console:
1. Go to: `http://localhost:8080/h2-console`
2. JDBC URL: `jdbc:h2:mem:testdb`
3. Username: `sa`
4. Password: `password`
5. Run query:
```sql
SELECT * FROM contact ORDER BY created_at DESC;
```

## Features

### ✅ What Works:
- Form validation (required fields)
- Email format validation (HTML5)
- Data persistence in database
- Automatic timestamp
- Success/error feedback
- Form reset after successful submission

### 🔄 Current Limitations:
- **No email sending** - Messages are only stored in database
- **No notification** - You won't get notified of new messages
- **No admin panel** - Need to check database manually

## Future Enhancements (Optional)

### 1. Email Notifications
Add email service to send notification when form is submitted:
```java
@PostMapping("/contacts")
public ResponseEntity<Contact> saveContact(@RequestBody Contact contact) {
    Contact saved = portfolioService.saveContact(contact);
    emailService.sendNotification(saved); // Add this
    return ResponseEntity.ok(saved);
}
```

### 2. Admin Dashboard
Create an admin page to view and manage contacts:
- List all messages
- Mark as read/unread
- Delete messages
- Reply functionality

### 3. Email Integration
Use services like:
- SendGrid
- Mailgun
- AWS SES
- Spring Mail

### 4. Form Validation
Add backend validation:
```java
@PostMapping("/contacts")
public ResponseEntity<Contact> saveContact(
    @Valid @RequestBody Contact contact,
    BindingResult result) {
    if (result.hasErrors()) {
        return ResponseEntity.badRequest().build();
    }
    // ... save logic
}
```

## Testing the Contact Form

### 1. Via Browser:
1. Go to `http://localhost:8080`
2. Scroll to "Get In Touch" section
3. Fill out the form
4. Click "Send Message"
5. Should see "Message Sent!" confirmation

### 2. Via API (curl):
```bash
curl -X POST http://localhost:8080/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message"
  }'
```

### 3. Check Database:
```sql
SELECT * FROM contact;
```

## Summary

The contact form is a **simple but functional** message storage system:
- ✅ Collects user information
- ✅ Validates input
- ✅ Stores in database
- ✅ Provides user feedback
- ⚠️ Does NOT send emails (messages stored only)
- ⚠️ No admin interface (check database directly)

To view messages, you can:
1. Use the API: `GET /api/contacts`
2. Access H2 Console and query the database
3. Add an admin panel (future enhancement)

