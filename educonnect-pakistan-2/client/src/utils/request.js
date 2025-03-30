export const apiRequest = async (url, method = 'GET', body = null, token = null) => {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...(body && { body: JSON.stringify(body) }),
    };
  
    const res = await fetch(url, options);
    const text = await res.text();
  
    let data = null;
    try {
      data = JSON.parse(text);
    } catch {
      if (!res.ok) throw new Error(text || 'Invalid server response');
      return { message: text };
    }
  
    if (!res.ok) throw new Error(data.message || 'Request failed');
    return data;
  };
  