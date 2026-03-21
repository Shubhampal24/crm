import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class ApiService {
  static const String baseUrl = 'http://10.0.2.2:5000/api';
  final Dio dio = Dio(BaseOptions(baseUrl: baseUrl));
  final _storage = const FlutterSecureStorage();

  ApiService() {
    dio.interceptors.add(InterceptorsWrapper(
      onRequest: (RequestOptions options, RequestInterceptorHandler handler) async {
        final token = await _storage.read(key: 'jwt_token');
        if (token != null) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        handler.next(options);
      },
    ));
  }

  Future<Response> post(String path, dynamic data) async {
    return dio.post(path, data: data);
  }

  Future<Response> get(String path, {Map<String, dynamic>? queryParameters}) async {
    return dio.get(path, queryParameters: queryParameters);
  }

  Future<Response> put(String path, [dynamic data]) async {
    return dio.put(path, data: data);
  }
}
