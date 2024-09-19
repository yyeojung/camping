import ReviewForm from "@/components/reviewForm/ReviewForm";
import { useRouter } from "next/router";

export default function index() {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  return (
    <ReviewForm>
      <div>d</div>
    </ReviewForm>
  );
}
