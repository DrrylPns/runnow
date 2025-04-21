import { Workout, WorkoutType } from './types';

// Predefined workout types
export const defaultWorkoutTypes: WorkoutType[] = [
    'Dumbbell',
    'Barbell',
    'Treadmill-Running',
    'Treadmill-Walking',
    'Yoga',
    'Running',
    'Walking',
    'Swimming',
];

// Generate some dummy workout data for the next 60 days
export const dummyWorkouts: Workout[] = generateDummyWorkouts();

function generateDummyWorkouts(): Workout[] {
    const workouts: Workout[] = [];
    const today = new Date();

    // Generate workouts for the last 30 days and next 30 days
    for (let i = -30; i <= 30; i++) {
        // Skip some days to make the data more realistic
        if (Math.random() > 0.4) {
            continue;
        }

        const date = new Date();
        date.setDate(today.getDate() + i);

        // Generate 1-2 workouts per day
        const workoutsPerDay = Math.random() > 0.7 ? 2 : 1;

        for (let j = 0; j < workoutsPerDay; j++) {
            // Randomly select 1-3 workout types
            const numTypes = Math.floor(Math.random() * 3) + 1;
            const selectedTypes: WorkoutType[] = [];

            for (let k = 0; k < numTypes; k++) {
                let type: WorkoutType;
                do {
                    type = defaultWorkoutTypes[Math.floor(Math.random() * defaultWorkoutTypes.length)];
                } while (selectedTypes.includes(type));

                selectedTypes.push(type);
            }

            // Generate random duration between 15 and 120 minutes
            const duration = Math.floor(Math.random() * 106) + 15;

            // Generate random calories between 100 and 800
            const calories = Math.floor(Math.random() * 701) + 100;

            // Sometimes include steps (for cardio workouts)
            const includeSteps = selectedTypes.some(type =>
                ['Treadmill', 'Other'].includes(type)
            );
            const steps = includeSteps ? Math.floor(Math.random() * 10000) + 1000 : undefined;

            // Sometimes include distance (for cardio workouts)
            const includeDistance = selectedTypes.some(type =>
                ['Treadmill', 'Cycling', 'Swimming'].includes(type)
            );
            const distance = includeDistance ? +(Math.random() * 10 + 1).toFixed(2) : undefined;

            workouts.push({
                id: `workout-${date.toISOString()}-${j}`,
                date: new Date(date),
                types: selectedTypes,
                durationMinutes: duration,
                caloriesBurned: calories,
                steps,
                distanceKm: distance,
                notes: Math.random() > 0.7 ? 'Felt great today!' : undefined
            });
        }
    }

    return workouts;
}