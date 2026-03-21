import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../attendance/attendance_screen.dart';
import '../complaints/complaint_screen.dart';
import '../notifications/notification_screen.dart';

class ParentDashboard extends StatelessWidget {
  const ParentDashboard({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    
    return Scaffold(
      appBar: AppBar(
        title: const Text('Parent Dashboard'),
        actions: [
          IconButton(icon: const Icon(Icons.notifications), onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const NotificationScreen()))),
          IconButton(icon: const Icon(Icons.logout), onPressed: () => auth.logout()),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            const Card(
              color: Colors.blueAccent,
              child: ListTile(
                title: Text('Child Attendance Summary', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                subtitle: Text('Present: 95% | Absent: 5%', style: TextStyle(color: Colors.white70)),
                trailing: Icon(Icons.analytics, color: Colors.white),
              ),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: GridView.count(
                crossAxisCount: 2,
                crossAxisSpacing: 16,
                mainAxisSpacing: 16,
                children: [
                  _DashboardTile(title: 'View Attendance', icon: Icons.calendar_today, onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const AttendanceScreen()))),
                  _DashboardTile(title: 'Timetable', icon: Icons.schedule, onTap: () {}),
                  _DashboardTile(title: 'Complaints', icon: Icons.report_problem, onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const ComplaintScreen()))),
                  _DashboardTile(title: 'Fees', icon: Icons.payment, onTap: () {}),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}

class _DashboardTile extends StatelessWidget {
  final String title;
  final IconData icon;
  final VoidCallback onTap;

  const _DashboardTile({required this.title, required this.icon, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Card(
        elevation: 2,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 48, color: Colors.blue),
            const SizedBox(height: 8),
            Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
          ],
        ),
      ),
    );
  }
}
