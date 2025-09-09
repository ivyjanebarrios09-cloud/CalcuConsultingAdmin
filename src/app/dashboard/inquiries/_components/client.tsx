"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
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
import type { Inquiry } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";

type InquiriesClientProps = {
  data: Inquiry[];
};

export function InquiriesClient({ data }: InquiriesClientProps) {
  const router = useRouter();
  const [inquiries, setInquiries] = React.useState(data);
  const [search, setSearch] = React.useState("");
  const [selectedInquiry, setSelectedInquiry] = React.useState<Inquiry | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    setInquiries(data);
  }, [data]);

  const filteredInquiries = inquiries.filter((inq) =>
    inq.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
    inq.companyName.toLowerCase().includes(search.toLowerCase()) ||
    inq.email.toLowerCase().includes(search.toLowerCase()) ||
    inq.phone.toLowerCase().includes(search.toLowerCase()) ||
    inq.jobTitles.join(', ').toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    if (!selectedInquiry) return;

    try {
      await deleteDoc(doc(db, "inquiries", selectedInquiry.id));
      toast({
        title: "Inquiry Deleted",
        description: `Inquiry from ${selectedInquiry.contactPerson} has been deleted.`,
      });
      router.refresh(); // This will re-fetch the data on the server
    } catch (error) {
      toast({
        title: "Error deleting inquiry",
        description: "There was a problem deleting the inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedInquiry(null);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search inquiries..."
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
              <TableHead>Contact Person</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Job Titles</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
             {filteredInquiries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No inquiries found.
                </TableCell>
              </TableRow>
            ) : (
              filteredInquiries.map((inq) => (
                <TableRow key={inq.id}>
                  <TableCell>
                    <div className="font-medium">{inq.contactPerson}</div>
                    <div className="text-sm text-muted-foreground">{inq.email}</div>
                  </TableCell>
                  <TableCell>{inq.phone}</TableCell>
                  <TableCell>{inq.companyName}</TableCell>
                  <TableCell>{inq.jobTitles.join(', ')}</TableCell>
                  <TableCell>{inq.submittedAt as string}</TableCell>
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
                            setSelectedInquiry(inq);
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
              ))
            )}
          </TableBody>
        </Table>
      </div>

       <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the inquiry from{' '}
              <span className="font-semibold">{selectedInquiry?.contactPerson}</span>.
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
