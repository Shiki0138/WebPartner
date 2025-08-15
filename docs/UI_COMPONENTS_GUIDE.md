# UI Components Guide

This guide provides comprehensive documentation for the reusable UI components created for the company management interface.

## Overview

The UI component library includes a complete set of reusable components following the existing design system:
- Consistent styling with Tailwind CSS
- Full TypeScript support
- Framer Motion animations
- Responsive design
- Accessibility features

## Component Categories

### 1. Cards
- **Card**: Base container component with customizable padding, shadow, and animations
- **MetricCard**: Display metrics with icon, value, and trend indicators
- **ActionCard**: Interactive cards with icon, title, and description
- **InfoCard**: Information display with optional actions

### 2. Buttons
- **Button**: Primary button component with multiple variants and sizes
- **IconButton**: Button with only an icon
- **ButtonGroup**: Group multiple buttons together
- **ToggleButton**: Toggle between multiple options

### 3. Forms
- **Input**: Text input with label, error handling, and icon support
- **TextArea**: Multi-line text input
- **Select**: Dropdown selection component
- **Checkbox**: Checkbox with label
- **Radio**: Radio button with label
- **FormGroup**: Container for form elements
- **FormSection**: Grouped form section with title

### 4. Tables
- **Table**: Full-featured data table with sorting, selection, and actions
- **TableAction**: Action buttons for table rows
- **Pagination**: Page navigation for tables

### 5. Charts
- **LineChart**: Line chart for time-series data
- **BarChart**: Bar chart with horizontal/vertical options
- **PieChart**: Pie/donut chart for proportional data
- **Sparkline**: Mini chart for inline data visualization
- **ProgressBar**: Progress indicator with percentage

### 6. Navigation
- **Tabs**: Tab navigation component
- **Breadcrumb**: Breadcrumb navigation
- **SideNavigation**: Vertical navigation menu
- **Steps**: Step-by-step progress indicator

### 7. Modals & Drawers
- **Modal**: Base modal component
- **ConfirmModal**: Confirmation dialog
- **AlertModal**: Alert dialog
- **Drawer**: Slide-out panel from left/right

### 8. Alerts & Notifications
- **Alert**: Inline alert messages
- **Toast**: Temporary notification
- **Notification**: Notification item
- **Banner**: Full-width banner

### 9. Badges & Tags
- **Badge**: Label/badge component
- **StatusBadge**: Online/offline status indicator
- **CountBadge**: Numeric badge for counts
- **Tag**: Removable tag component

### 10. Loading States
- **Spinner**: Spinning loader
- **DotsLoader**: Animated dots
- **ProgressLoader**: Progress bar with percentage
- **Skeleton**: Placeholder loading state
- **LoadingOverlay**: Full overlay loader
- **LoadingCard**: Card skeleton loader
- **LoadingTable**: Table skeleton loader

## Usage Examples

### Basic Card with Metrics
```tsx
import { MetricCard } from '@/components/ui';
import { Users } from 'lucide-react';

<MetricCard
  icon={Users}
  label="Total Users"
  value="1,234"
  change={12}
  trend="up"
  color="from-blue-500 to-blue-600"
/>
```

### Form with Validation
```tsx
import { Input, Button, FormGroup } from '@/components/ui';

<FormGroup>
  <Input
    label="Email"
    type="email"
    placeholder="user@example.com"
    error={errors.email}
    required
  />
  <Button type="submit">Submit</Button>
</FormGroup>
```

### Data Table
```tsx
import { Table, Badge } from '@/components/ui';

<Table
  columns={[
    { key: 'name', header: 'Name', sortable: true },
    { 
      key: 'status', 
      header: 'Status',
      render: (value) => (
        <Badge variant={value === 'active' ? 'success' : 'danger'}>
          {value}
        </Badge>
      )
    }
  ]}
  data={users}
  selectable
  onSort={handleSort}
/>
```

### Modal Dialog
```tsx
import { Modal, Button } from '@/components/ui';

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Edit User"
  footer={
    <>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleSave}>Save</Button>
    </>
  }
>
  <p>Modal content here</p>
</Modal>
```

## Design Tokens

### Colors
- Primary: Blue (`#3B82F6`)
- Secondary: Purple (`#8B5CF6`)
- Success: Green (`#10B981`)
- Warning: Yellow (`#F59E0B`)
- Danger: Red (`#EF4444`)
- Info: Cyan (`#06B6D4`)

### Spacing
- xs: 0.5rem
- sm: 1rem
- md: 1.5rem
- lg: 2rem
- xl: 3rem

### Shadows
- sm: `shadow-sm`
- md: `shadow-md`
- lg: `shadow-lg`
- xl: `shadow-xl`

## Best Practices

1. **Consistency**: Use the same variant and size across similar components
2. **Accessibility**: Always provide labels and ARIA attributes
3. **Loading States**: Show appropriate loading indicators during async operations
4. **Error Handling**: Display clear error messages with recovery actions
5. **Responsive Design**: Test components on different screen sizes
6. **Animation**: Use animations sparingly and provide motion preferences

## Component API Reference

For detailed API documentation of each component, view the demo page at `/admin/ui-components` or refer to the TypeScript definitions in the component files.

## Contributing

When creating new components:
1. Follow the existing naming conventions
2. Include TypeScript types
3. Add proper documentation
4. Create examples in the demo page
5. Test across different browsers and devices