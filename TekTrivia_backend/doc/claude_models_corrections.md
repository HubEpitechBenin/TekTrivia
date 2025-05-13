# Django Models Analysis and Recommendations

## General Issues Across Multiple Files

1. **Inconsistent Model Organization**: Models are spread across multiple files without clear organization strategy.
2. **Missing App Labels**: Models reference related models without proper app labels (e.g., `'Achievements.Rank'` vs `'Rank'`).
3. **Inconsistent ID Fields**: Some models use UUID, others use PositiveIntegerField, and one uses AutoField.
4. **Missing Documentation**: Limited or non-existent docstrings.
5. **Reused File Names**: Multiple files named `models.py` makes it difficult to distinguish between them.

## Analysis By File

### Notifications Models (`models.py`)

#### Issues:

1. **Python Dataclasses vs Django Models Mixing**:
   - `Text`, `ImageElement`, and `DesignNotification` are Python dataclasses, but they're in a Django models file.
   - These dataclasses don't integrate with Django's ORM.

2. **Priority Class**:
   - `Priority` is defined as a Python `Enum` but referenced as a foreign key model.
   - Cannot be used as a foreign key target unless it's a Django model.

3. **JSONField Issue**:
   - Uses `django.contrib.postgres.fields.JSONField` which is deprecated since Django 3.1.
   - Does not provide schema validation for the JSON content.

4. **Commented Code**:
   - Contains commented out relationships and fields (`design`, `content`).

5. **Missing Auto-Incrementing ID**:
   - Uses manually assigned `PositiveIntegerField` as primary key.

#### Recommendations:

```python
from django.db import models
from django.db.models import JSONField  # Use this instead of contrib.postgres

class Priority(models.TextChoices):
    LOW = "low", "Low Priority"
    MEDIUM = "medium", "Medium Priority"
    HIGH = "high", "High Priority"

class NotificationDesign(models.Model):
    """Stores design-related information for notifications."""
    background_color = models.CharField(max_length=7)  # #RRGGBB format
    border_radius = models.PositiveIntegerField()  # pixels
    display_duration = models.PositiveIntegerField(default=5)  # seconds
    
    def __str__(self):
        return f"Design #{self.id}"

class NotificationImage(models.Model):
    """Images that can be attached to a notification."""
    notification = models.ForeignKey('Notification', related_name='images', on_delete=models.CASCADE)
    url = models.URLField()
    position_x = models.PositiveIntegerField()
    position_y = models.PositiveIntegerField()
    width = models.PositiveIntegerField()
    height = models.PositiveIntegerField()
    
    def __str__(self):
        return f"Image for notification #{self.notification_id}"

class Notification(models.Model):
    """Main notification model."""
    # Use auto-incrementing ID by default
    type = models.CharField(max_length=64)
    content = JSONField()  # Store text content with styling information
    title = models.CharField(max_length=64)
    receiver = models.ForeignKey('Users.Player', on_delete=models.CASCADE)  # Link to actual model
    sender = models.CharField(max_length=128)
    is_read = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    priority = models.CharField(max_length=10, choices=Priority.choices, default=Priority.MEDIUM)
    design = models.OneToOneField(NotificationDesign, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.title} ({self.type}) - {self.receiver}"
    
    class Meta:
        verbose_name = "Notification"
        verbose_name_plural = "Notifications"
        ordering = ['-created_at', 'priority']
```

### Authentication Models (`auth_models.py`)

#### Issues:

1. **Commented Code**: Contains commented out code (`#if settings.TESTING...`).
2. **Implicit UUID Generation**: UUID generation uses a function call as default.
3. **Import Redundancy**: Imports `Player` and `Admin` but no direct usage is visible.

#### Recommendations:

```python
import binascii
import os
import uuid
from django.db import models
from django.conf import settings

def generate_key():
    """Generates a secure random key for token authentication."""
    return binascii.hexlify(os.urandom(20)).decode()

class Token(models.Model):
    """Base token model for authentication."""
    public_id = models.UUIDField(db_index=True, unique=True, default=uuid.uuid4, editable=False)
    access = models.CharField(max_length=40, blank=True)  # Will be populated in save()
    refresh = models.CharField(max_length=40, blank=True, null=True)  # Will be populated in save()
    created_at = models.DateTimeField(auto_now_add=True)
    last_used = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.access:
            self.access = generate_key()
        if not self.refresh:
            self.refresh = generate_key()
        return super().save(*args, **kwargs)

    def regenerate(self, force_refresh=False):
        """Regenerate access token and optionally refresh token."""
        self.access = generate_key()
        if force_refresh:
            self.refresh = generate_key()
        self.save()

    def __str__(self):
        return f"Token {self.public_id}"

    class Meta:
        abstract = True

class PlayerAuthToken(Token):
    """Authentication token specific to Players."""
    user = models.OneToOneField('Users.Player', on_delete=models.CASCADE, related_name='auth_token')
    
    class Meta:
        verbose_name = "Player Authentication Token"
        verbose_name_plural = "Player Authentication Tokens"

class AdminAuthToken(Token):
    """Authentication token specific to Admins."""
    user = models.OneToOneField('Users.Admin', on_delete=models.CASCADE, related_name='auth_token')
    
    class Meta:
        verbose_name = "Admin Authentication Token"
        verbose_name_plural = "Admin Authentication Tokens"
```

### User Models (`models.py`)

#### Issues:

1. **Unused Import**: `User = get_user_model()` is imported but not used.
2. **Redundant User Role Field**: Role field in `BaseUser` is redundant with model inheritance.
3. **Inefficient Password Hashing**: Password should be hashed before saving, not after.
4. **Inconsistent Relationship with Django Auth**: Not leveraging Django's auth models.
5. **Missing Relationships**: Comment placeholders for relationships to other models.
6. **Double Metadata Inheritance**: `Meta` in `Player` and `Admin` override `TimeStampedModel`.
7. **Duplicate Field Definition**: Role is defined in both `BaseUser` and child classes.
8. **Ambiguous Foreign Key**: Uses `'Achievements.Rank'` but might have circular import issues.

#### Recommendations:

```python
import uuid
from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class TimeStampedModel(models.Model):
    """Abstract base model with timestamps."""
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        abstract = True
        ordering = ['-created_at']

class BaseUser(TimeStampedModel):
    """Base user model containing common user attributes."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    last_name = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    # profile_picture = models.ImageField(upload_to='profile_pictures', null=True, blank=True)
    email_confirmed = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)

    class Meta:
        abstract = True

    def __str__(self):
        return self.email

    def get_full_name(self):
        """Returns the user's full name."""
        return f'{self.first_name} {self.last_name}'

    def set_password(self, raw_password):
        """Hash and set password."""
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        """Check if raw_password matches the stored password."""
        return check_password(raw_password, self.password)

    def save(self, *args, **kwargs):
        self.email = self.email.lower()
        # Ensure password is hashed before saving if it has changed
        if self._state.adding or self._password_changed:  # Simulate tracking password changes
            self.set_password(self.password)
        super().save(*args, **kwargs)

class Player(BaseUser):
    """Player user model for game participants."""
    username = models.CharField(max_length=255, unique=True)
    level = models.PositiveIntegerField(default=0)
    current_xp = models.PositiveIntegerField(default=0)
    current_points = models.PositiveIntegerField(default=0)
    login_streak = models.PositiveIntegerField(default=0)
    login_count = models.PositiveIntegerField(default=0)
    rank = models.ForeignKey(
        'Achievements.Rank',
        on_delete=models.SET_NULL,  # Better to set NULL than DO_NOTHING
        null=True,
        related_name='players'
    )
    title = models.ForeignKey(
        'Achievements.Title',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='titled_players'
    )
    friends = models.ManyToManyField(
        'self',
        symmetrical=True,  # If A is friend with B, B is friend with A
        blank=True,
        related_name='+'  # No reverse relation to avoid confusion
    )
    
    class Meta:
        db_table = 'player'
        verbose_name = 'Player'
        verbose_name_plural = 'Players'
        ordering = ['created_at']

class Admin(BaseUser):
    """Admin user model for system administrators."""
    is_superadmin = models.BooleanField(default=False)
    
    class Meta:
        db_table = 'admin'
        verbose_name = 'Admin'
        verbose_name_plural = 'Admins'
        ordering = ['created_at']
    
    def save(self, *args, **kwargs):
        # Ensure admins are active by default
        if self._state.adding:
            self.is_active = True
        super().save(*args, **kwargs)
```

### Achievements Models (`models.py`)

#### Issues:

1. **Duplicate Imports**: Multiple imports of the same modules.
2. **Misspelled Field**: `nex_rank` should be `next_rank`.
3. **Inefficient ForeignKey**: Self-referential ForeignKey for Rank progression.
4. **Missing User Relationship**: No reverse relation defined for Players.
5. **Improper ID Field**: Uses `PositiveIntegerField` for primary key instead of auto-incrementing.

#### Recommendations:

```python
from django.db import models
from Users.models import TimeStampedModel

class Title(TimeStampedModel):
    """Achievement titles that can be earned by players."""
    name = models.CharField(max_length=255)
    description = models.TextField()
    # image = models.ImageField(upload_to='achievements/titles/')
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Title'
        verbose_name_plural = 'Titles'
        ordering = ['id']

class Rank(TimeStampedModel):
    """Player rank progression system."""
    name = models.CharField(max_length=255)
    description = models.TextField()
    min_xp = models.PositiveIntegerField(unique=True)
    next_rank = models.OneToOneField(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='previous_rank'
    )
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Rank'
        verbose_name_plural = 'Ranks'
        ordering = ['min_xp']
        
    @property
    def next_rank_xp_requirement(self):
        """Calculate XP needed to reach next rank."""
        if self.next_rank:
            return self.next_rank.min_xp - self.min_xp
        return None
```

## General Best Practices and Recommendations:

1. **Use Django's Built-in User Model**:
   - Consider extending Django's `AbstractUser` or `AbstractBaseUser` instead of creating a completely custom user system.

2. **Consistent Primary Key Strategy**:
   - Pick one primary key strategy (Auto, UUID, etc.) and use it consistently.
   - Recommendation: Use UUIDs for user-related models and auto-incrementing IDs for other models.

3. **Model Organization**:
   - Each Django app should have one `models.py` file.
   - Use clear naming for apps (e.g., `users`, `achievements`, `notifications`).

4. **Proper Foreign Key References**:
   - Always use string references with app labels: `'app_name.ModelName'`.
   - Use related_name to make reverse relations intuitive.

5. **Choice Fields**:
   - Use Django's `TextChoices` for enumeration fields instead of Python's `Enum`.

6. **Documentation**:
   - Add docstrings to all models and complex methods.
   - Use descriptive variable and method names.

7. **Custom Manager Methods**:
   - Add custom manager methods for common queries.

8. **Database Constraints**:
   - Add appropriate database constraints (unique_together, indexes, etc.).

9. **Model Validation**:
   - Implement `clean()` methods for model-level validation.

10. **Signals**:
    - Consider using signals for cross-model interactions.

## Specific Architecture Recommendations:

1. **Authentication System**:
   - Consider using Django REST Framework's token authentication or JWT instead of custom tokens.

2. **Notification System**:
   - Implement a generic notification system with polymorphic relationships.

3. **User Hierarchy**:
   - Use Django's Group and Permission system instead of hard-coded roles.

4. **Achievements System**:
   - Create an explicit Achievement model that links Titles and Ranks to requirements.

## Conclusion

The current Django models have several issues related to data modeling, Django's ORM usage, and software design principles. By implementing the recommendations above, you can create a more maintainable, efficient, and Django-idiomatic codebase. The suggested changes aim to leverage Django's built-in features, reduce redundancy, and improve code organization while maintaining the core functionality of your application.

