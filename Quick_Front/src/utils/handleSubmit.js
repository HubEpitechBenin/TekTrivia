const handleSubmit = async (url, data, setError, onSuccess) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    
        const resData = await response.json();
    
        if (response.ok) {
            onSuccess?.(resData);
        } else {
            setError(resData.error || "Une erreur est survenue.");
        }
    } catch (err) {
        console.error("Erreur réseau :", err);
        setError("Erreur réseau. Veuillez réessayer.");
    }
};
  
export default handleSubmit;
  