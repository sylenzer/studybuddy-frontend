// components/TestimonialForm.jsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const TestimonialForm = ({ onSubmit }) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [role, setRole] = useState("Student");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !message) return;
    onSubmit({ name, role, message });
    toast({ title: "Thank you!", description: "Your feedback has been submitted." });
    setName("");
    setMessage("");
    setRole("Student");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <select
        className="w-full border rounded p-2 text-sm"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="Student">Student</option>
        <option value="Parent">Parent</option>
        <option value="Educator">Educator</option>
      </select>
      <Textarea
        placeholder="Share your thoughts..."
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
        Submit
      </Button>
    </form>
  );
};