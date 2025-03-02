
# setup base react native project
bunx @react-native-community/cli@latest init $NAME
cd $NAME
bun install
bunx pod-install


rename package name in android and ios we manutally do this atm




### Setup navigation
bun add @react-navigation/native 
bun add react-native-screens 
bun add react-native-safe-area-context
bun add @react-navigation/native-stack

#### Add the highlighted code to the body of MainActivity class:

```
class MainActivity: ReactActivity() {
  // ...
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)
  }
  // ...
}
```

Also might need to import 
```
import android.os.Bundle
```

