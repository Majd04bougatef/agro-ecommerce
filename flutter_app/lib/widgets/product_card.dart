import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/product.dart';
import '../models/cart_item.dart';
import '../providers/cart_provider.dart';

const CATEGORY_EMOJI = {
  'légumes': '🥦',
  'fruits': '🍎',
  'céréales': '🌾',
  'produits_laitiers': '🥛',
  'viandes': '🥩',
};

class ProductCard extends StatelessWidget {
  final Product product;

  const ProductCard({Key? key, required this.product}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: 120,
            color: Colors.green[50],
            child: Center(
              child: Text(
                CATEGORY_EMOJI[product.category] ?? '🌿',
                style: const TextStyle(fontSize: 48),
              ),
            ),
          ),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(8),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    product.category.replaceAll('_', ' '),
                    style: const TextStyle(fontSize: 10, color: Colors.green, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    product.name,
                    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const Spacer(),
                  Text(
                    '${product.price.toStringAsFixed(2)} € / ${product.unit}',
                    style: TextStyle(color: Colors.green[700], fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 8),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: product.stock == 0
                          ? null
                          : () {
                              final cart = Provider.of<CartProvider>(context, listen: false);
                              cart.addItem(CartItem(
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                unit: product.unit,
                              ));
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(content: Text('${product.name} ajouté au panier')),
                              );
                            },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: product.stock == 0 ? Colors.grey : Colors.green[700],
                        padding: const EdgeInsets.symmetric(vertical: 8),
                      ),
                      child: Text(
                        product.stock == 0 ? 'Rupture' : '+ Panier',
                        style: const TextStyle(color: Colors.white, fontSize: 12),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
