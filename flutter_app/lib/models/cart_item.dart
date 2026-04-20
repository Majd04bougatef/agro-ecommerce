class CartItem {
  final String id;
  final String name;
  final double price;
  final String unit;
  int quantity;

  CartItem({
    required this.id,
    required this.name,
    required this.price,
    required this.unit,
    this.quantity = 1,
  });

  double get subtotal => price * quantity;
}
