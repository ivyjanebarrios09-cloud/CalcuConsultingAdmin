"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Search, Trash2 } from "lucide-react";
import type { Application } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

type ApplicationsClientProps = {
  data: Application[];
};

export function ApplicationsClient({ data }: ApplicationsClientProps) {
  const [applications, setApplications] = React.useState(data);
  const [search, setSearch] = React.useState("");
  const [selectedApplication, setSelectedApplication] = React.useState<Application | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const { toast } = useToast();

  const filteredApplications = applications.filter((app) =>
    `${app.firstName} ${app.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    app.email.toLowerCase().includes(search.toLowerCase()) ||
    app.jobType.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = () => {
    if (!selectedApplication) return;
    setApplications(applications.filter((app) => app.id !== selectedApplication.id));
    toast({
      title: "Application Deleted",
      description: `Application from ${selectedApplication.firstName} ${selectedApplication.lastName} has been deleted.`,
    });
    setIsDeleteDialogOpen(false);
    setSelectedApplication(null);
  };

  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search applications..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="border rounded-lg bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Applicant</TableHead>
              <TableHead>Job Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date Applied</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.map((app) => (
              <TableRow key={app.id}>
                <TableCell>
                  <div className="font-medium">{`${app.firstName} ${app.lastName}`}</div>
                  <div className="text-sm text-muted-foreground">{app.email}</div>
                </TableCell>
                <TableCell>{app.jobType}</TableCell>
                <TableCell>{app.location}</TableCell>
                <TableCell>{app.submittedAt}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onSelect={() => {
                          setSelectedApplication(app);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

       <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the application from{' '}
              <span className="font-semibold">{selectedApplication?.firstName} {selectedApplication?.lastName}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
