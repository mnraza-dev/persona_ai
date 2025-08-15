import { mentorProfiles } from "@/data/mentors";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MentorSelectProps {
  onSelect: (id: string) => void;
  selectedMentors: string[]; // pass selected mentors from parent
}

export default function MentorSelect({ onSelect, selectedMentors }: MentorSelectProps) {
  return (
    <div className="grid sm:grid-cols-2 gap-6 py-8 mt-10">
      {mentorProfiles.map((p) => {
        const isSelected = selectedMentors.includes(p.key); // check from parent state

        return (
          <Card
            key={p.key}
            className={`relative border-2 transition-all duration-200 hover:border-blue-400 cursor-pointer ${
              isSelected ? "border-blue-500 shadow-lg" : "border-transparent"
            }`}
            onClick={() => onSelect(p.key)}
          >
            <div
              className={`absolute top-2 right-2 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center transform transition-transform duration-300 ${
                isSelected ? "scale-100" : "scale-0"
              }`}
            >
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <CardHeader className="flex items-center gap-4">
              <img src={p.avatar} alt={p.displayName} className="w-14 h-14 rounded-full border" />
              <div>
                <CardTitle className="text-lg font-bold">{p.displayName}</CardTitle>
                <p className="text-xs text-muted-foreground">{p.shortTitle}</p>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-sm mb-4 line-clamp-3">{p.bio}</p>
              <Button variant={isSelected ? "default" : "secondary"} className="w-full">
                {isSelected ? "Selected" : "Chat as " + p.displayName.split(" ")[0]}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
