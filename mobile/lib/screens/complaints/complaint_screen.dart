import 'package:flutter/material.dart';

class ComplaintScreen extends StatefulWidget {
  const ComplaintScreen({super.key});

  @override
  State<ComplaintScreen> createState() => _ComplaintScreenState();
}

class _ComplaintScreenState extends State<ComplaintScreen> {
  final List<Map<String, String>> complaints = [
    {'subject': 'Bus route delay', 'status': 'PENDING'},
  ];

  void _showRaiseComplaintDialog() {
    final titleController = TextEditingController();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Raise Complaint'),
        content: TextField(
          controller: titleController,
          decoration: const InputDecoration(labelText: 'Subject'),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () {
              setState(() {
                complaints.add({'subject': titleController.text, 'status': 'PENDING'});
              });
              Navigator.pop(context);
            },
            child: const Text('Submit'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Complaints')),
      floatingActionButton: FloatingActionButton(
        onPressed: _showRaiseComplaintDialog,
        child: const Icon(Icons.add),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16.0),
        itemCount: complaints.length,
        itemBuilder: (context, index) {
          final c = complaints[index];
          return Card(
            child: ListTile(
              title: Text(c['subject']!),
              trailing: Chip(
                label: Text(c['status']!, style: const TextStyle(color: Colors.white, fontSize: 10)),
                backgroundColor: c['status'] == 'PENDING' ? Colors.orange : Colors.green,
              ),
            ),
          );
        },
      ),
    );
  }
}
