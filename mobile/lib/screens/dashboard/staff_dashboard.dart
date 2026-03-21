import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../attendance/attendance_screen.dart';
import '../timetable/timetable_screen.dart';
import '../notifications/notification_screen.dart';

class StaffDashboard extends StatelessWidget {
  const StaffDashboard({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    
    return Scaffold(
      appBar: AppBar(
        title: const Text('Staff Dashboard'),
        backgroundColor: Colors.blue.shade800,
        foregroundColor: Colors.white,
        actions: [
          IconButton(icon: const Icon(Icons.notifications), onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const NotificationScreen()))),
          IconButton(icon: const Icon(Icons.logout), onPressed: () => auth.logout()),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text('Welcome back, ${auth.email ?? "Teacher"}!', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            const SizedBox(height: 24),
            ElevatedButton.icon(
              icon: const Icon(Icons.check_circle_outline),
              label: const Text('Mark Student Attendance'),
              style: ElevatedButton.styleFrom(padding: const EdgeInsets.all(16), backgroundColor: Colors.green, foregroundColor: Colors.white),
              onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const AttendanceScreen())),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: GridView.count(
                crossAxisCount: 2,
                crossAxisSpacing: 16,
                mainAxisSpacing: 16,
                children: [
                  _DashboardTile(title: 'My Timetable', icon: Icons.schedule, onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const TimetableScreen()))),
                  _DashboardTile(title: 'Leave Requests', icon: Icons.flight_takeoff, onTap: () {}),
                  _DashboardTile(title: 'Classes', icon: Icons.class_, onTap: () {}),
                  _DashboardTile(title: 'Reports', icon: Icons.analytics, onTap: () {}),
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
            Icon(icon, size: 48, color: Colors.blue.shade800),
            const SizedBox(height: 8),
            Text(title, style: const TextStyle(fontWeight: FontWeight.bold), textAlign: TextAlign.center),
          ],
        ),
      ),
    );
  }
}
