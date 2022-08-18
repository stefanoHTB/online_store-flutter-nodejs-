import 'package:flutter/material.dart';
import 'package:online_store/common/widgets/bottom_bar.dart';
import 'package:online_store/constants/global_variables.dart';
import 'package:online_store/features/admin/screens/admin_screen.dart';
import 'package:online_store/features/auth/screens/auth_screen.dart';
import 'package:online_store/features/auth/services/auth_service.dart';
import 'package:online_store/features/home/screens/home_screens.dart';
import 'package:online_store/providers/user_provider.dart';
import 'package:online_store/router.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MultiProvider(
      providers: [ChangeNotifierProvider(create: (context) => UserProvider())],
      child: const MyApp()));
}

class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  final AuthService authService = AuthService();

  @override
  void initState() {
    super.initState();
    authService.getUserData(context);
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Online Store',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
            appBarTheme: const AppBarTheme(
                elevation: 0, iconTheme: IconThemeData(color: Colors.black)),
            scaffoldBackgroundColor: GlobalVariables.backgroundColor,
            colorScheme: const ColorScheme.light(
                primary: GlobalVariables.secondaryColor)),
        onGenerateRoute: (settings) => generateRoute(settings),
        home: Provider.of<UserProvider>(context).user.token.isNotEmpty
            ? Provider.of<UserProvider>(context).user.type == 'user'
                ? BottomBar()
                : AdminScreen()
            : AuthScreen());
  }
}
