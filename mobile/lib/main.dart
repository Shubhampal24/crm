import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'providers/auth_provider.dart';
import 'screens/auth/login_screen.dart';
import 'screens/dashboard/parent_dashboard.dart';
import 'screens/dashboard/staff_dashboard.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
      ],
      child: const SchoolApp(),
    ),
  );
}

class SchoolApp extends StatelessWidget {
  const SchoolApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'School CRM',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: const AuthWrapper(),
    );
  }
}

class AuthWrapper extends StatelessWidget {
  const AuthWrapper({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();

    if (!auth.isAuthenticated) {
      return const LoginScreen();
    }

    if (auth.role == 'STAFF' || auth.role == 'PRINCIPAL' || auth.role == 'ADMIN') {
      return const StaffDashboard();
    }

    return const ParentDashboard();
  }
}
