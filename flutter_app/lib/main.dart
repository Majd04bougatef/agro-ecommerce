import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'providers/cart_provider.dart';
import 'screens/home_screen.dart';
import 'screens/products_screen.dart';
import 'screens/cart_screen.dart';
import 'screens/checkout_screen.dart';
import 'screens/auth_screen.dart';
import 'services/api_service.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  bool isLoggedIn = false;

  @override
  void initState() {
    super.initState();
    _checkLoginStatus();
  }

  void _checkLoginStatus() {
    setState(() {
      isLoggedIn = ApiService.token != null;
    });
  }

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => CartProvider(),
      child: MaterialApp(
        title: 'Agro E-Commerce',
        theme: ThemeData(
          primarySwatch: Colors.green,
          useMaterial3: true,
        ),
        routes: {
          '/': (ctx) => isLoggedIn
              ? const HomeScreen()
              : AuthScreen(onLoginSuccess: () => setState(() => isLoggedIn = true)),
          '/products': (ctx) => const ProductsScreen(),
          '/cart': (ctx) => const CartScreen(),
          '/checkout': (ctx) => const CheckoutScreen(),
          '/auth': (ctx) =>
              AuthScreen(onLoginSuccess: () => setState(() => isLoggedIn = true)),
        },
      ),
    );
  }
}
