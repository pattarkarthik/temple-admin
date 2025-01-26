const fetch = async () => {
    try {
      const res = await api.get(`/api/members/`);
      setData(res.data);
      setLoading(true);
    } catch (error) {
      setLoading(false);
      setErrorAlert(true);
      setTimeout(() => setErrorAlert(false), 5000); // Auto-dismiss alert
    } finally {
      setLoading(false);
    }
  };