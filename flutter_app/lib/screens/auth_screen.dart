import 'package:flutter/material.dart';
import '../services/api_service.dart';

class AuthScreen extends StatefulWidget {
  const AuthScreen({Key? key}) : super(key: key);

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  bool isLogin = true;
  final nameCtrl = TextEditingController();
  final emailCtrl = TextEditingController();
  final passwordCtrl = TextEditingController();
  String selectedRole = 'buyer';
  bool isLoading = false;
  String? error;

  Future<void> _submit() async {
    setState(() {
      isLoading = true;
      error = null;
    });

    try {
      if (isLogin) {
        await ApiService.login(emailCtrl.text, passwordCtrl.text);
      } else {
        await ApiService.register(nameCtrl.text, emailCtrl.text, passwordCtrl.text, selectedRole);
      }
      if (mounted) {
        Navigator.pushReplacementNamed(context, '/');
      }
    } catch (e) {
      setState(() => error = e.toString());
    } finally {
      if (mounted) setState(() => isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(isLogin ? 'Connexion' : 'Inscription'),
        backgroundColor: Colors.green[700],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 20),
            if (!isLogin) ...[
              const Text('Nom complet'),
              TextField(controller: nameCtrl, decoration: const InputDecoration(hintText: 'Jean Dupont')),
              const SizedBox(height: 12),
            ],
            const Text('Email'),
            TextField(controller: emailCtrl, decoration: const InputDecoration(hintText: 'votre@email.com')),
            const SizedBox(height: 12),
            const Text('Mot de passe'),
            TextField(
              controller: passwordCtrl,
              obscureText: true,
              decoration: const InputDecoration(hintText: '••••••••'),
            ),
            if (!isLogin) ...[
              const SizedBox(height: 12),
              const Text('Je suis'),
              DropdownButton<String>(
                value: selectedRole,
                items: const [
                  DropdownMenuItem(value: 'buyer', child: Text('Acheteur')),
                  DropdownMenuItem(value: 'farmer', child: Text('Agriculteur')),
                ],
                onChanged: (v) => setState(() => selectedRole = v ?? 'buyer'),
              ),
            ],
            const SizedBox(height: 16),
            if (error != null)
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Colors.red[50],
                  border: Border.all(color: Colors.red),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(error!, style: TextStyle(color: Colors.red[700])),
              ),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: isLoading ? null : _submit,
                style: ElevatedButton.styleFrom(backgroundColor: Colors.green[700]),
                child: isLoading
                    ? const SizedBox(
                        height: 20,
                        width: 20,
                        child: CircularProgressIndicator(strokeWidth: 2, valueColor: AlwaysStoppedAnimation(Colors.white)),
                      )
                    : Text(isLogin ? 'Se connecter' : 'S\'inscrire', style: const TextStyle(color: Colors.white)),
              ),
            ),
            const SizedBox(height: 12),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(isLogin ? 'Pas de compte ? ' : 'Déjà un compte ? '),
                GestureDetector(
                  onTap: () => setState(() => isLogin = !isLogin),
                  child: Text(
                    isLogin ? 'S\'inscrire' : 'Se connecter',
                    style: TextStyle(color: Colors.green[700], fontWeight: FontWeight.bold),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  @override
  void dispose() {
    nameCtrl.dispose();
    emailCtrl.dispose();
    passwordCtrl.dispose();
    super.dispose();
  }
}
