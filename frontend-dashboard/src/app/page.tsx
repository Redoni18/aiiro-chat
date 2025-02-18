'use client';

import { useState } from 'react';
import { TextInput, Button, Paper, Text, Container, Stack } from '@mantine/core';
import { askQuestion } from '../services/api';
import { useForm } from '@mantine/form';

export default function Home() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      question: '',
    },

    validate: {
      question: (value) => (value ? null : 'Question is required'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);

    try {
      const data = await askQuestion(values.question);
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
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              <TextInput
                label="Your question"
                placeholder="Type your question here"
                key={form.key('question')}
                {...form.getInputProps('question')}
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
