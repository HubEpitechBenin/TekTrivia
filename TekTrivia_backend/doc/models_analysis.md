# Django Models Analysis and Recommendations

## Table of Contents
1. [General Issues Across All Models](#general-issues-across-all-models)
2. [Analysis By File](#analysis-by-file)
   - [Achievements/models.py](#achievementsmodelspy)
   - [Notifications/models.py](#notificationsmodelspy)
   - [Quizzes/models.py](#quizzesmodelspy)
   - [Users/models.py](#usersmodelspy)
   - [Users/auth_models.py](#usersauth_modelspy)
3. [Best Practices and Recommendations](#best-practices-and-recommendations)
   - [Model Design](#model-design)
   - [Field Choices](#field-choices)
   - [Primary Keys](#primary-keys)
   - [Relationships](#relationships)
   - [Performance Considerations](#performance-considerations)
   - [Security Considerations](#security-considerations)
   - [Code Organization](#code-organization)

## General Issues Across All Models

1. **Inconsistent Primary Key Types**:
   - UUID fields in Users models
   - PositiveIntegerField in Achievements, Notifications, and some Quizzes models
   - AutoField in some Quizzes models

   This inconsistency makes relationships between models more complex and can lead to confusion.

2. **Mixing Python Enums with Django Models**:
   - Several files use Python's `Enum` class but reference them as foreign keys, which won't work
   - Should use Django's `TextChoices` or `IntegerChoices` for model choices

3. **Inconsistent Model Naming**:
   - Some models use singular names (e.g., `Quiz`, `Question`)
   - Others use plural names (e.g., `Badges`, `Notifications`)
   - Django convention is to use singular names for models

4. **Missing Docstrings**:
   - Most models and methods lack proper documentation
   - Makes code harder to understand and maintain

5. **Commented Out Code**:
   - Many files contain commented out code that should be either implemented or removed
   - Creates confusion about what features are actually implemented

6. **Inconsistent Field Naming**:
   - Mix of snake_case and camelCase in field names
   - Some fields have unclear abbreviations (e.g., `req_XP`)

7. **Missing App Labels in Foreign Keys**:
   - Foreign keys to models in other apps often don't include the app label
   - Can cause issues with Django's app loading system

8. **Lack of Validation**:
   - Few models implement custom validation logic
   - Relies too heavily on database constraints

9. **Inconsistent Use of Meta Classes**:
   - Some models have detailed Meta classes
   - Others lack important Meta options

10. **No Use of Django's Built-in Features**:
    - Custom authentication instead of Django's auth system
    - Manual timestamp fields instead of Django's auto_now/auto_now_add

## Analysis By File

### Achievements/models.py

#### Issues:

1. **Duplicate Import**:
   ```python
   from django.db import models  # Line 1
   from django.db import models  # Line 4
   ```

2. **Typo in Field Name**:
   ```python
   nex_rank = models.ForeignKey(...)  # Should be next_rank
   ```

3. **Manual Primary Key Management**:
   ```python
   id = models.PositiveIntegerField(primary_key=True)
   ```
   Using manual IDs requires additional logic to ensure uniqueness.

4. **Unused Import**:
   ```python
   from django.contrib.auth import get_user_model
   ```
   This import is never used in the file.

5. **Commented Out Fields**:
   ```python
   # image = models.ImageField(upload_to='achievements_images')
   ```
   Creates uncertainty about whether this feature is planned or abandoned.

#### Recommendations:

```python
from django.db import models
from Users.models import TimeStampedModel

class Title(TimeStampedModel):
    """
    Represents a title that can be earned by players.
    Titles are displayed alongside player names.
    """
    name = models.CharField(max_length=255, help_text="Name of the title")
    description = models.TextField(help_text="Description of how to earn this title")
    image = models.ImageField(upload_to='achievements/titles/', null=True, blank=True,
                             help_text="Image representing this title")

    class Meta:
        verbose_name = 'Title'
        verbose_name_plural = 'Titles'
        ordering = ['id']

    def __str__(self):
        return self.name

class Rank(TimeStampedModel):
    """
    Represents a player rank in the game.
    Ranks are earned by accumulating experience points.
    """
    name = models.CharField(max_length=255, help_text="Name of the rank")
    description = models.TextField(help_text="Description of this rank")
    min_xp = models.PositiveIntegerField(help_text="Minimum XP required to achieve this rank")
    next_rank = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        help_text="The next rank after this one"
    )

    class Meta:
        verbose_name = 'Rank'
        verbose_name_plural = 'Ranks'
        ordering = ['min_xp']

    def __str__(self):
        return self.name
```

### Notifications/models.py

#### Issues:

1. **Mixing Python Dataclasses with Django Models**:
   ```python
   @dataclass
   class Text:
       # ...

   class Notifications(models.Model):
       # ...
   ```
   Dataclasses don't integrate with Django's ORM.

2. **Using Enum as Foreign Key Target**:
   ```python
   class Priority(Enum):
       # ...

   class Notifications(models.Model):
       priority = models.ForeignKey('Priority', on_delete=models.CASCADE)
   ```
   Python Enums can't be used as foreign key targets.

3. **Deprecated JSONField**:
   ```python
   from django.contrib.postgres.fields import JSONField
   ```
   This import is deprecated since Django 3.1.

4. **Non-English Field Names**:
   ```python
   alignement: Literal['gauche', 'centre', 'droite'] = 'gauche'
   ```
   Using French terms in code reduces readability for non-French speakers.

5. **Plural Model Name**:
   ```python
   class Notifications(models.Model):
   ```
   Django convention is to use singular names.

#### Recommendations:

```python
from django.db import models
from django.db.models import JSONField  # Use this instead of contrib.postgres

class NotificationPriority(models.TextChoices):
    """Priority levels for notifications"""
    LOW = "low", "Low Priority"
    MEDIUM = "medium", "Medium Priority"
    HIGH = "high", "High Priority"

class NotificationDesign(models.Model):
    """
    Stores design-related information for notifications.
    """
    background_color = models.CharField(max_length=7, help_text="Background color in #RRGGBB format")
    border_radius = models.PositiveIntegerField(help_text="Border radius in pixels")
    display_duration = models.PositiveIntegerField(default=5, help_text="Display duration in seconds")

    def __str__(self):
        return f"Design #{self.id}"

class NotificationImage(models.Model):
    """
    Images that can be attached to a notification.
    """
    notification = models.ForeignKey('Notification', related_name='images', on_delete=models.CASCADE)
    url = models.URLField(help_text="URL of the image")
    position_x = models.PositiveIntegerField(help_text="X position in pixels")
    position_y = models.PositiveIntegerField(help_text="Y position in pixels")
    width = models.PositiveIntegerField(help_text="Width in pixels")
    height = models.PositiveIntegerField(help_text="Height in pixels")

    def __str__(self):
        return f"Image for notification #{self.notification_id}"

class Notification(models.Model):
    """
    Represents a notification sent to a user.
    """
    type = models.CharField(max_length=64, help_text="Type of notification")
    content = JSONField(help_text="JSON content of the notification")
    title = models.CharField(max_length=64, help_text="Title of the notification")
    receiver = models.CharField(max_length=128, help_text="Recipient of the notification")
    is_read = models.BooleanField(default=False, help_text="Whether the notification has been read")
    is_deleted = models.BooleanField(default=False, help_text="Whether the notification has been deleted")
    priority = models.CharField(
        max_length=10,
        choices=NotificationPriority.choices,
        default=NotificationPriority.MEDIUM,
        help_text="Priority level of the notification"
    )
    design = models.OneToOneField(
        NotificationDesign,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        help_text="Design settings for this notification"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.receiver})"
```

### Quizzes/models.py

#### Issues:

1. **Mixing Enum with TextChoices**:
   ```python
   class QuizType(models.TextChoices):
       # ...

   class Type(Enum):
       # ...
   ```
   Inconsistent approach to defining choices.

2. **Foreign Keys to Enum Classes**:
   ```python
   my_type = models.ForeignKey('Type', on_delete=models.CASCADE)
   difficulty = models.ForeignKey('Difficulty', on_delete=models.CASCADE)
   ```
   Python Enums can't be used as foreign key targets.

3. **Storing Lists as Text Fields**:
   ```python
   answers = models.TextField()
   good_answers = models.TextField()
   list_images = models.TextField()
   ```
   Using text fields for lists is inefficient and error-prone.

4. **Hardcoded Upload Path**:
   ```python
   file = models.FileField(upload_to='/contents')
   ```
   Using an absolute path is problematic and may not work across environments.

5. **Inconsistent Primary Key Types**:
   ```python
   id = models.AutoField(primary_key=True)  # Quiz
   id = models.PositiveIntegerField(primary_key=True)  # Badges
   ```
   Different models use different primary key types.

#### Recommendations:

```python
from django.db import models

class QuizType(models.TextChoices):
    """Types of quizzes available in the system"""
    MULTIPLE_CHOICE = 'MCQ', 'Multiple Choice Question'
    SINGLE_CHOICE = 'SCQ', 'Single Choice Question'
    TRUE_FALSE = 'TF', 'True or False'

class ResourceType(models.TextChoices):
    """Types of resources that can be attached to quizzes"""
    IMAGE = 'image', 'Image'
    VIDEO = 'video', 'Video'
    AUDIO = 'audio', 'Audio'
    LINK = 'link', 'Link'

class DifficultyLevel(models.TextChoices):
    """Difficulty levels for questions"""
    EASY = 'easy', 'Easy'
    MEDIUM = 'medium', 'Medium'
    DIFFICULT = 'difficult', 'Difficult'

class Category(models.Model):
    """
    Categories for organizing quizzes.
    """
    name = models.CharField(max_length=100, unique=True, help_text="Name of the category")
    description = models.TextField(help_text="Description of the category")

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        ordering = ['name']

    def __str__(self):
        return self.name

class Quiz(models.Model):
    """
    Represents a quiz that players can take.
    """
    quiz_type = models.CharField(
        max_length=3,
        choices=QuizType.choices,
        help_text="Type of quiz"
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        help_text="Category this quiz belongs to"
    )
    name = models.CharField(max_length=100, unique=True, help_text="Name of the quiz")
    points_awarded = models.IntegerField(default=0, help_text="Points awarded for completing this quiz")
    is_validated = models.BooleanField(default=False, help_text="Whether this quiz has been validated")
    creator = models.CharField(max_length=100, help_text="Creator of this quiz")

    class Meta:
        verbose_name = 'Quiz'
        verbose_name_plural = 'Quizzes'
        ordering = ['name']

    def __str__(self):
        return self.name

class Resource(models.Model):
    """
    Resources attached to quizzes (images, videos, etc.).
    """
    quiz = models.ForeignKey(
        Quiz,
        related_name='resources',
        on_delete=models.CASCADE,
        help_text="Quiz this resource belongs to"
    )
    type = models.CharField(
        max_length=10,
        choices=ResourceType.choices,
        help_text="Type of resource"
    )
    file = models.FileField(
        upload_to='quiz_resources/',
        null=True,
        blank=True,
        help_text="Uploaded file for this resource"
    )
    url = models.URLField(
        null=True,
        blank=True,
        help_text="URL for this resource"
    )

    class Meta:
        verbose_name = 'Resource'
        verbose_name_plural = 'Resources'

    def __str__(self):
        return f"{self.get_type_display()} for {self.quiz.name}"

    def clean(self):
        """Validate that either file or URL is provided based on resource type"""
        from django.core.exceptions import ValidationError

        if self.type in ['image', 'video', 'audio'] and not self.file and not self.url:
            raise ValidationError(f"{self.get_type_display()} resources require either a file or URL")

        if self.type == 'link' and not self.url:
            raise ValidationError("Link resources require a URL")

class Answer(models.Model):
    """
    Represents a possible answer to a question.
    """
    question = models.ForeignKey(
        'Question',
        related_name='answer_options',
        on_delete=models.CASCADE,
        help_text="Question this answer belongs to"
    )
    text = models.TextField(help_text="Text of the answer")
    is_correct = models.BooleanField(default=False, help_text="Whether this is a correct answer")

    def __str__(self):
        return f"Answer for question #{self.question_id}"

class Question(models.Model):
    """
    Represents a question in a quiz.
    """
    text = models.TextField(help_text="Text of the question")
    points = models.IntegerField(help_text="Points awarded for correctly answering this question")
    difficulty = models.CharField(
        max_length=10,
        choices=DifficultyLevel.choices,
        default=DifficultyLevel.MEDIUM,
        help_text="Difficulty level of this question"
    )
    quiz_body = models.ForeignKey(
        'QuizBody',
        related_name='questions',
        on_delete=models.CASCADE,
        help_text="Quiz body this question belongs to"
    )

    def __str__(self):
        return f"Question: {self.text[:50]}..."

class Badge(models.Model):
    """
    Badges that can be earned by players.
    """
    required_xp = models.PositiveIntegerField(help_text="XP required to earn this badge")
    image_url = models.CharField(max_length=255, help_text="URL to the badge image")
    category = models.CharField(max_length=255, help_text="Category this badge belongs to")

    class Meta:
        verbose_name = 'Badge'
        verbose_name_plural = 'Badges'

    def __str__(self):
        return f"Badge: {self.category} ({self.required_xp} XP)"

class QuizBody(models.Model):
    """
    Contains the questions for a quiz.
    """
    quiz = models.OneToOneField(
        Quiz,
        on_delete=models.CASCADE,
        help_text="Quiz this body belongs to"
    )

    def __str__(self):
        return f"Body for quiz: {self.quiz.name}"
```

### Users/models.py

#### Issues:

1. **Unused Import**:
   ```python
   User = get_user_model()  # Never used
   ```

2. **Overriding Django's check_password Method**:
   ```python
   def check_password(self, raw_password):
       return check_password(raw_password, self.password)
   ```
   This can cause confusion with Django's built-in method.

3. **Inconsistent Ordering**:
   ```python
   class Meta:
       abstract = True
       ordering = ['-created_at']  # TimeStampedModel

   class Meta:
       ordering = ['created_at']  # Player
   ```
   Different ordering directions in different models.

4. **Missing App Labels in Foreign Keys**:
   ```python
   rank = models.ForeignKey(
       'Achievements.Rank',  # Should include app label
       on_delete=models.DO_NOTHING,
       null=True,
   )
   ```

5. **No Integration with Django's Auth System**:
   The custom user models don't extend Django's AbstractUser or AbstractBaseUser.

#### Recommendations:

```python
import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class TimeStampedModel(models.Model):
    """
    Abstract base model that includes created and updated timestamps.
    """
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        ordering = ['-created_at']

class UserManager(BaseUserManager):
    """
    Custom manager for User model.
    """
    def create_user(self, email, password=None, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Creates and saves a superuser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('role', 'admin')

        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin, TimeStampedModel):
    """
    Custom user model that uses email as the unique identifier.
    """
    ROLE_CHOICES = [
        ('player', 'Player'),
        ('admin', 'Admin'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=255, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    email_confirmed = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'role']

    def __str__(self):
        return self.email

    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'

    def get_short_name(self):
        return self.first_name

class PlayerProfile(TimeStampedModel):
    """
    Profile for players with game-related information.
    """
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='player_profile',
        limit_choices_to={'role': 'player'}
    )
    username = models.CharField(max_length=255, unique=True)
    level = models.PositiveIntegerField(default=0)
    current_xp = models.PositiveIntegerField(default=0)
    current_points = models.PositiveIntegerField(default=0)
    login_streak = models.PositiveIntegerField(default=0)
    login_count = models.PositiveIntegerField(default=0)
    rank = models.ForeignKey(
        'Achievements.Rank',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    title = models.ForeignKey(
        'Achievements.Title',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    badges = models.ManyToManyField(
        'Quizzes.Badge',
        blank=True,
        related_name='players'
    )
    friends = models.ManyToManyField(
        'self',
        blank=True,
        symmetrical=True
    )

    class Meta:
        verbose_name = 'Player Profile'
        verbose_name_plural = 'Player Profiles'

    def __str__(self):
        return f"Profile for {self.user.get_full_name()} ({self.username})"

class AdminProfile(TimeStampedModel):
    """
    Profile for administrators with admin-specific information.
    """
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='admin_profile',
        limit_choices_to={'role': 'admin'}
    )
    is_superadmin = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Admin Profile'
        verbose_name_plural = 'Admin Profiles'

    def __str__(self):
        return f"Admin: {self.user.get_full_name()}"
```

### Users/auth_models.py

#### Issues:

1. **Redundant Function**:
   ```python
   def generate_uuid():
       return uuid.uuid4()
   ```
   This function just calls uuid.uuid4() without adding any value.

2. **Security Risk in __str__ Method**:
   ```python
   def __str__(self):
       return self.refresh
   ```
   Returning the refresh token in string representation could lead to accidental exposure.

3. **No Token Expiration**:
   No fields for tracking token creation time or expiration.

4. **Commented Out Code**:
   ```python
   # if settings.TESTING:
   #     return #???
   ```
   Unclear commented code.

5. **No Integration with Django's Auth System**:
   Custom token implementation instead of using Django's built-in token authentication.

#### Recommendations:

```python
import binascii
import os
import uuid
from django.db import models
from django.utils import timezone
from datetime import timedelta

def generate_key():
    """Generate a random key for token authentication"""
    return binascii.hexlify(os.urandom(20)).decode()

class Token(models.Model):
    """
    Abstract base model for authentication tokens.
    """
    public_id = models.UUIDField(db_index=True, unique=True, default=uuid.uuid4)
    access = models.CharField(max_length=40, db_index=True)
    refresh = models.CharField(max_length=40)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        """Generate tokens if not provided and set expiration"""
        if not self.access:
            self.access = generate_key()
        if not self.refresh:
            self.refresh = generate_key()
        if not self.expires_at:
            # Default expiration: 7 days from creation
            self.expires_at = timezone.now() + timedelta(days=7)
        return super().save(*args, **kwargs)

    def regenerate(self, force_refresh=False):
        """Regenerate access token and optionally refresh token"""
        self.access = generate_key()
        if force_refresh:
            self.refresh = generate_key()
        # Reset expiration
        self.expires_at = timezone.now() + timedelta(days=7)
        self.save()

    def is_expired(self):
        """Check if token is expired"""
        return timezone.now() >= self.expires_at

    def __str__(self):
        """Safe string representation that doesn't expose token values"""
        return f"Token {self.public_id} (expires: {self.expires_at})"

class PlayerAuthToken(Token):
    """Authentication token for players"""
    user = models.OneToOneField('Users.User', on_delete=models.CASCADE, limit_choices_to={'role': 'player'})

class AdminAuthToken(Token):
    """Authentication token for administrators"""
    user = models.OneToOneField('Users.User', on_delete=models.CASCADE, limit_choices_to={'role': 'admin'})
```

## Best Practices and Recommendations

### Model Design

1. **Use Abstract Base Models**:
   - Create abstract base models for common fields (like `TimeStampedModel`)
   - Reduces code duplication and ensures consistency

2. **Follow Django Naming Conventions**:
   - Use singular names for models (e.g., `Notification` not `Notifications`)
   - Use lowercase with underscores for field names (snake_case)

3. **Add Proper Documentation**:
   - Add docstrings to all models and complex methods
   - Include help_text for fields to improve admin interface usability

4. **Use Django's Built-in Features**:
   - Extend Django's auth models instead of creating custom ones
   - Use Django's built-in fields and validators where possible

### Field Choices

1. **Use Django's Choices Classes**:
   - Use `models.TextChoices` or `models.IntegerChoices` instead of Python `Enum`
   - Provides better integration with Django's form and admin systems

2. **Define Choices Close to Usage**:
   - Define choices as inner classes or close to the model that uses them
   - Makes the relationship between models and choices clearer

3. **Use Descriptive Choice Values**:
   - Choice values should be meaningful and consistent
   - Include human-readable display names

### Primary Keys

1. **Be Consistent with Primary Key Types**:
   - Choose one approach (UUID, AutoField, etc.) and use it consistently
   - Makes relationships between models simpler

2. **Consider Using UUID for Public-Facing IDs**:
   - Provides better security by not exposing sequential IDs
   - Useful for user-related models

3. **Let Django Handle Primary Keys**:
   - Use `AutoField` or `BigAutoField` and let Django manage IDs
   - Avoids issues with manually managing unique IDs

### Relationships

1. **Use Appropriate on_delete Behavior**:
   - `CASCADE`: Delete related objects when the referenced object is deleted
   - `SET_NULL`: Set the reference to NULL (requires null=True)
   - `PROTECT`: Prevent deletion of the referenced object
   - `SET_DEFAULT`: Set the default value (requires default to be set)
   - `DO_NOTHING`: Take no action (rarely appropriate)

2. **Include App Labels in Foreign Keys**:
   ```python
   rank = models.ForeignKey(
       'Achievements.Rank',  # Include app label
       on_delete=models.SET_NULL,
       null=True
   )
   ```

3. **Use related_name for Reverse Relations**:
   - Makes queries more intuitive
   - Avoids naming conflicts

### Performance Considerations

1. **Add Indexes to Frequently Queried Fields**:
   ```python
   email = models.EmailField(max_length=255, unique=True, db_index=True)
   ```

2. **Use JSONField for Structured Data**:
   - Use Django's built-in JSONField instead of storing JSON in text fields
   - Provides better querying capabilities

3. **Avoid Storing Lists as Text Fields**:
   - Use proper relational design with foreign keys
   - Or use JSONField for simple lists

### Security Considerations

1. **Don't Expose Sensitive Information in __str__ Methods**:
   - Avoid including passwords, tokens, or personal data
   - These can appear in logs or admin interfaces

2. **Use Django's Password Handling**:
   - Use `set_password()` and `check_password()` methods from Django's auth system
   - Never store plain text passwords
   - Don't implement your own password hashing

3. **Validate User Input**:
   - Implement `clean()` methods on models to validate data
   - Use Django's validators for common validation patterns
   - Don't rely solely on form validation

4. **Use Proper Permissions**:
   - Implement proper permission checks for model access
   - Consider using Django's permission system

### Code Organization

1. **One Model Per Class**:
   - Each model should be its own class
   - Avoid cramming multiple concepts into a single model

2. **Group Related Models**:
   - Keep related models in the same file or app
   - Use abstract base classes for common functionality

3. **Separate Business Logic**:
   - Use model methods for business logic related to a single instance
   - Use manager methods for operations that span multiple instances
   - Consider using services for complex operations

4. **Follow Django App Structure**:
   - Group related models into apps
   - Each app should have a single, well-defined responsibility
   - Use app_label in Meta class when referencing models across apps

5. **Use Signals Judiciously**:
   - Signals can make code flow hard to follow
   - Document signal handlers well
   - Consider using explicit method calls for clarity

6. **Consistent Import Style**:
   - Group imports by source (standard library, Django, third-party, local)
   - Sort imports alphabetically within groups
   - Use absolute imports for clarity
