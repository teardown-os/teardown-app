# Component and Screen Templates

This rule provides templates for creating React components and screens with a consistent structure for the teardown-app project.

## Component Organization

- **UI Components**: Reusable UI components should be placed in the `src/components/ui/` directory
- **Feature Components**: Feature-specific components should be placed in appropriate feature directories
- **Screens**: Screen components should be placed in the `src/screens/` directory

## UI Component Template

When creating a new UI-based reusable component in `src/components/ui/`, use this structure:

```tsx
import React, { type FunctionComponent } from "react";
import { View } from "@/components/ui/view";

export type ComponentNameProps = Record<string, never>;

export const ComponentName: FunctionComponent<ComponentNameProps> = () => {
  return (
    <View className="flex flex-1 items-center justify-center gap-8">
      
    </View>
  );
};
```

## Screen Template

When creating a new screen, use this structure:

```tsx
import React, { type FunctionComponent } from "react";
import { View } from "@/components/ui/view";

export type ScreenNameScreenProps = Record<string, never>;

export const ScreenNameScreen: FunctionComponent<ScreenNameScreenProps> = () => {
  return (
    <View className="flex flex-1 items-center justify-center gap-8">
      
    </View>
  );
};
```

## Usage Instructions

### Creating a UI Component

1. Create a new file in `src/components/ui/` with the name of your component in lowercase and `.tsx` extension
2. Follow the UI Component Template structure above
3. Replace "ComponentName" with your actual component name in PascalCase

### Creating a Screen

1. Create a new file in `src/screens/` with the name of your screen in lowercase followed by `.screen.tsx`
2. Follow the Screen Template structure above
3. Replace "ScreenName" with your actual screen name in PascalCase (without the "Screen" suffix in the filename)

## File Patterns

This rule applies to:
- `src/components/ui/**/*.tsx` - For reusable UI components
- `src/screens/**/*.tsx` - For screen components 