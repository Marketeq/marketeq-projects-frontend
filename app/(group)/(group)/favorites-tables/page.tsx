

'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/apiClient';


interface Entity {
  id: string;
  name: string;
  skills: string[];
}

export default function FavoritesTablesPage() {
  const [projects, setProjects] = useState<Entity[]>([]);
  const [talents, setTalents] = useState<Entity[]>([]);
  const [jobs, setJobs] = useState<Entity[]>([]);

  useEffect(() => {
    apiClient.get('/projects').then((res) => setProjects(res.data));
    apiClient.get('/talents').then((res) => setTalents(res.data));
    apiClient.get('/jobs').then((res) => setJobs(res.data));
  }, []);

  return (
    <div style={{ padding: 32 }}>
      <h1>Favorites Tables</h1>

      <h2>Projects</h2>
      <EntityTable data={projects} />

      <h2>Talents</h2>
      <EntityTable data={talents} />

      <h2>Jobs</h2>
      <EntityTable data={jobs} />
    </div>
  );
}

function EntityTable({ data }: { data: Entity[] }) {
  return (
    <table border={1} cellPadding={10} cellSpacing={0}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Skills</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.skills.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}