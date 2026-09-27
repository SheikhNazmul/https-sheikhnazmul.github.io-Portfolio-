const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://strjfuuiftvmqowmuqnm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0cmpmdXVpZnR2bXFvd211cW5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwOTUzMDksImV4cCI6MjA5ODY3MTMwOX0.dIaCy9RaQTlj14uYL53BkJD43M1CSvRr0IGPapg32d8";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function inspect() {
  console.log("Fetching a product...");
  const { data: products, error: pErr } = await supabase.from("products").select("*").limit(1);
  console.log("Product fields:", products ? Object.keys(products[0] || {}) : null, pErr);

  console.log("Fetching a profile...");
  const { data: profiles, error: prErr } = await supabase.from("profiles").select("*").limit(1);
  console.log("Profile fields:", profiles ? Object.keys(profiles[0] || {}) : null, prErr);

  console.log("Fetching an order...");
  const { data: orders, error: oErr } = await supabase.from("orders").select("*").limit(1);
  console.log("Order fields:", orders ? Object.keys(orders[0] || {}) : null, oErr);

  console.log("Fetching an order item...");
  const { data: items, error: iErr } = await supabase.from("order_items").select("*").limit(1);
  console.log("Order item fields:", items ? Object.keys(items[0] || {}) : null, iErr);
}

inspect();
