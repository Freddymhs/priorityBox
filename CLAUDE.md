# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PriorityBox is a React Native task management app built with Expo that implements the Eisenhower Matrix for task prioritization. The app uses Firebase Realtime Database for data persistence and follows SOLID principles.

**Tech Stack:**
- React Native 0.74.5
- Expo 51.0.39
- Firebase Realtime Database
- Native Base UI components
- React Navigation (Drawer)
- Node 20.19.6 (managed by Volta)

## Development Commands

### Running the App

```bash
# Start Metro bundler
npm start

# Run on iOS simulator
npm run ios

# Run on Android (WayDroid/physical device)
npm run android

# Run on web
npm run web
```

### WayDroid Development (Linux)

The `npm run android` command uses a custom script (`run-android-waydroid.sh`) that:
1. Cleans up Metro zombie processes
2. Forces Metro to listen on IPv4 (WayDroid requirement)
3. Restarts Expo Go for clean hot reload
4. Automatically connects to the device

**Critical:** Metro MUST listen on IPv4 for WayDroid connectivity. The script sets `EXPO_PACKAGER_HOSTNAME=${LOCAL_IP}` to force IPv4 binding on port 8080.

### Database Initialization

```bash
# Initialize Firebase with example data
npm run firebase:init
```

## Architecture

### SOLID Principles Implementation

The codebase follows SOLID principles with clear separation of concerns:

**Services Layer** (`lib/services/`)
- `DatabaseService.js` - Abstract interface for Firebase operations (DIP)
- `ListService.js` - List CRUD operations
- `ItemService.js` - Item CRUD operations

**Hooks Layer** (`lib/hooks/`)
- `useLists.js` - List management logic
- `useItems.js` - Item management logic
- `useConfirmation.js` - Confirmation dialogs

**Constants** (`lib/constants/`)
- `theme.js` - Colors, fonts, common styles
- `matrix.js` - Eisenhower Matrix configuration (quadrants, labels, select options)

**Utils** (`lib/utils/`)
- `matrixUtils.js` - Pure functions for categorizing items by quadrant

### Data Flow

```
MyContext (Provider)
    ↓
Uses ListService.getAll()
    ↓
Provides boxData to all screens
    ↓
Screens use hooks (useItems, useLists)
    ↓
Hooks use Services (ItemService, ListService)
    ↓
Services use DatabaseService
    ↓
Firebase Realtime Database
```

**Key Context Values:**
- `boxData` - All lists and items from Firebase
- `refetchBoxData()` - Refetch data after mutations
- `isLoading` - Loading state

### Screen Structure

```
AppArea/
├── Screens/
│   ├── HomeSection/
│   │   ├── Matriz.jsx           # Eisenhower Matrix view
│   │   └── ModalAddItem.jsx     # Modal to add items
│   ├── ListSection/
│   │   ├── index.jsx            # Lists screen container
│   │   ├── ListOfLists.jsx      # Display all lists
│   │   └── ModalAddList.jsx     # Modal to create lists
│   └── GuideSection/
│       └── index.jsx            # Tutorial/guide screen
└── Components/
    └── SafeContainer.jsx        # Cross-platform SafeArea wrapper
```

### Firebase Data Structure

```javascript
{
  "listas": {
    "ListName": {
      "description": "string",
      "items": [
        {
          "name": "string",
          "priority": "alto" | "bajo",
          "type": "necesidad" | "deseo"
        }
      ]
    }
  }
}
```

### Eisenhower Matrix Quadrants

Items are categorized into 4 quadrants based on `type` and `priority`:

- **Q1 (Urgent + Important):** `type: "necesidad"`, `priority: "alto"`
- **Q2 (Not Urgent + Important):** `type: "necesidad"`, `priority: "bajo"`
- **Q3 (Urgent + Not Important):** `type: "deseo"`, `priority: "alto"`
- **Q4 (Not Urgent + Not Important):** `type: "deseo"`, `priority: "bajo"`

Categorization logic is in `lib/utils/matrixUtils.js`.

## Important Patterns

### SafeArea Handling

Use the `SafeContainer` component for all screens to handle notches and status bars consistently across iOS and Android:

```jsx
import { SafeContainer } from "../../Components/SafeContainer";

export const MyScreen = () => (
  <SafeContainer style={styles.container}>
    {/* content */}
  </SafeContainer>
);
```

### Using Hooks for Business Logic

Always use hooks instead of direct service calls in components:

```jsx
import { useItems, useLists } from "../../../lib/hooks";

export const MyComponent = () => {
  const { boxData, refetchBoxData } = useContext(MyContext);
  const { addItem, deleteItem } = useItems(boxData, refetchBoxData);
  const { createList } = useLists(boxData, refetchBoxData);

  // Use hooks methods instead of calling services directly
};
```

### Barrel Exports Pattern

All module folders use index.js for clean imports:

```javascript
// Instead of:
import { COLORS } from "../../../lib/constants/theme";
import { QUADRANTS } from "../../../lib/constants/matrix";

// Use:
import { COLORS, QUADRANTS } from "../../../lib/constants";
```

## Known Issues & Workarounds

### Yarn Berry (PnP) Incompatibility with Expo

The project uses Yarn Berry with `nodeLinker: node-modules` (configured in `.yarnrc.yml`) because Expo CLI doesn't work with Yarn PnP. Do not change this configuration.

### Metro Port Configuration

Metro uses port **8080** (not the default 8081) for WayDroid compatibility. This is hardcoded in the run script.

### Hot Reload Requirements

For hot reload to work consistently:
1. Metro must start with `--clear` flag (cache clearing)
2. Expo Go must be force-stopped and restarted
3. Both steps are automated in `run-android-waydroid.sh`

## File Locations

- **Firebase config:** `lib/init-firebase.js`
- **Main entry:** `App.js` → `AppArea/index.jsx`
- **Navigation:** `AppArea/Navigator/index.jsx`
- **Development script:** `run-android-waydroid.sh`
