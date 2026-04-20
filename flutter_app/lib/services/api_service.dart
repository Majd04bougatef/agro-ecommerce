import 'package:http/http.dart' as http;
import 'dart:convert';
import '../models/product.dart';

class ApiService {
  static const String baseUrl = 'http://192.168.100.159:5000/api';
  static String? token;

  static Future<List<Product>> getProducts({String? category}) async {
    try {
      String url = '$baseUrl/products';
      if (category != null) {
        url += '?category=$category';
      }
      final response = await http.get(Uri.parse(url));
      if (response.statusCode == 200) {
        List<dynamic> data = jsonDecode(response.body);
        return data.map((p) => Product.fromJson(p)).toList();
      } else {
        throw Exception('Erreur chargement produits');
      }
    } catch (e) {
      throw Exception('Erreur réseau: $e');
    }
  }

  static Future<Map<String, dynamic>> register(
    String name,
    String email,
    String password,
    String role,
  ) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/auth/register'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'name': name,
          'email': email,
          'password': password,
          'role': role,
        }),
      );
      if (response.statusCode == 201) {
        final data = jsonDecode(response.body);
        token = data['token'];
        return data;
      } else {
        throw Exception(jsonDecode(response.body)['error'] ?? 'Erreur inscription');
      }
    } catch (e) {
      throw Exception('Erreur: $e');
    }
  }

  static Future<Map<String, dynamic>> login(String email, String password) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/auth/login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email, 'password': password}),
      );
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        token = data['token'];
        return data;
      } else {
        throw Exception(jsonDecode(response.body)['error'] ?? 'Erreur connexion');
      }
    } catch (e) {
      throw Exception('Erreur: $e');
    }
  }

  static Future<Map<String, dynamic>> createOrder(List<Map<String, dynamic>> items, double totalAmount) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/orders'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode({
          'items': items,
          'totalAmount': totalAmount,
        }),
      );
      if (response.statusCode == 201) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Erreur création commande');
      }
    } catch (e) {
      throw Exception('Erreur: $e');
    }
  }

  static Future<Map<String, dynamic>> createPaymentIntent(double amount) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/payments/create-payment-intent'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode({'amount': amount}),
      );
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Erreur paiement');
      }
    } catch (e) {
      throw Exception('Erreur: $e');
    }
  }
}
