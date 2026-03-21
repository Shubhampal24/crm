import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../services/api_service.dart';

class AuthProvider with ChangeNotifier {
  final ApiService _api = ApiService();
  final _storage = const FlutterSecureStorage();

  bool _isAuthenticated = false;
  String? _role;
  String? _email;

  bool get isAuthenticated => _isAuthenticated;
  String? get role => _role;
  String? get email => _email;

  Future<void> login(String email, String password) async {
    try {
      final response = await _api.post('/auth/login', {
        'email': email,
        'password': password,
      });

      if (response.data['success'] == true) {
        final data = response.data['data'];
        await _storage.write(key: 'jwt_token', value: data['accessToken']);
        
        _isAuthenticated = true;
        _role = data['user']['role'];
        _email = data['user']['email'];
        notifyListeners();
      }
    } catch (e) {
      rethrow;
    }
  }

  Future<void> logout() async {
    await _storage.delete(key: 'jwt_token');
    _isAuthenticated = false;
    _role = null;
    _email = null;
    notifyListeners();
  }
}
