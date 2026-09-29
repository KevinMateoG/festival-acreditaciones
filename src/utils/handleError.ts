import { type Response } from 'express';

export default function handleError(
  error: Error | unknown,
  res: Response
) {
  if (error instanceof Error && error.message.includes('bad_request')) {
    return res.status(400).json({ error: error.message });
  }

  if (error instanceof Error && error.message.includes('not_found')) {
    return res.status(404).json({ error: error.message });
  }

  if (error instanceof Error && error.message.includes('invalid_resource')) {
    return res.status(400).json({ error: error.message });
  }

  if (error instanceof Error &&(
    error.message.includes('accreditation_already_exists') ||
    error.message.includes('photographer_limit_reached') ||
    error.message.includes('request_not_pending')
  )){
        return res.status(409).json({ error: error.message });
    }  

  if (error instanceof Error && error.message.includes('internal_server_error')) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(500).json({ error: 'Internal server error' });
}