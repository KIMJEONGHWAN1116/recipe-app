import { useEffect, useMemo, useState } from "react";
import { loadRecipes, saveRecipes } from "../utils/storage.js";

function makeId() {
  return crypto?.randomUUID?.() ?? String(Date.now());
}

export default function useRecipes() {
  const [recipes, setRecipes] = useState(() => loadRecipes());

  useEffect(() => {
    saveRecipes(recipes);
  }, [recipes]);

  const api = useMemo(() => {
    return {
      recipes,
      add(recipe) {
        const now = new Date().toISOString();
        const newRecipe = {
          id: makeId(),
          title: recipe.title.trim(),
          description: recipe.description.trim(),
          ingredients: recipe.ingredients, 
          steps: recipe.steps, 
          tags: recipe.tags, 
          image: recipe.image || "",      
          createdAt: now,
          updatedAt: now,
        };
        setRecipes(prev => [newRecipe, ...prev]);
        return newRecipe.id;
      },
      update(id, patch) {
        const now = new Date().toISOString();
        setRecipes(prev =>
          prev.map(r => (r.id === id ? { ...r, ...patch, updatedAt: now } : r))
        );
      },
      remove(id) {
        setRecipes(prev => prev.filter(r => r.id !== id));
      },
      getById(id) {
        return recipes.find(r => r.id === id);
      },
    };
  }, [recipes]);

  return api;
}