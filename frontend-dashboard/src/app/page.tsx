'use client';

import { useState } from 'react';
import { TextInput, Button, Paper, Text, Container, Stack } from '@mantine/core';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const res = await fetch(`${apiUrl}/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error: Could not get a response');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm">
      <Stack mt="xl">
        <Paper shadow="xs" p="md">
          <form onSubmit={handleSubmit}>
            <Stack>
              <TextInput
                required
                label="Your question"
                placeholder="Type your question here"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <Button type="submit" loading={loading}>
                Ask
              </Button>
            </Stack>
          </form>
        </Paper>

        {response && (
          <Paper shadow="xs" p="md">
            <Text size="sm" fw={500} mb={5}>
              Response:
            </Text>
            <Text>{response}</Text>
          </Paper>
        )}
      </Stack>
    </Container>
  );
}
