const formatErrorMessages = (errors: Partial<Record<string, [string, ...string[]]>>): string => {
  return Object.entries(errors)
      .map(([field, messages]) => {
        if (!messages) {
          return '';
        }

        return `${field.charAt(0).toUpperCase() + field.slice(1)} field is ${messages.map(message => message.toLowerCase()).join(', ')}`;
      })
      .join(', ');
};

export { formatErrorMessages };
