# React Three Fiber (R3F) and 3D Canvas Rules

Guidelines for editing or creating 3D Canvas scenes in `src/components/` (e.g., `Lanyard.tsx` / `Hero.tsx`).

## Rendering & Performance (useFrame)

1. **Direct Ref Mutation**: Never update React state inside `useFrame()`. This triggers full component re-renders every frame. Instead, mutate object properties directly via refs:
   ```typescript
   // Correct
   useFrame(() => {
     ref.current.rotation.y += 0.01;
   });
   ```
2. **Avoid Object Allocations**: Do not instantiate new Vectors, Matrices, Colors, or Eulers inside `useFrame()`. Declare them once in parent scope and reuse them with `.set()`, `.copy()`, or `.add()` to prevent garbage collection pauses.
3. **Raycasting Optimization**: Limit interactive raycasting checks (e.g., hover/click events on Canvas meshes) by disabling raycasting on complex background meshes using `raycast={null}` or `pointerEvents="none"`.

## Asset Management & Preloading

4. **Asset Preloading**: Always call `.preload` on loaders (e.g., `useGLTF.preload('/model.glb')`) in the global module scope of component files. This ensures assets are fetched before mounting, avoiding visual lag or layout shifts.
5. **Texture Formats**: Prioritize next-gen compressed texture formats like `.avif` or `.webp`. Keep geometry vertex count as low as possible.

## Memory Cleanup & Garbage Collection

6. **Resource Disposal**: Three.js does not automatically free GPU resources (geometries, materials, textures, render targets). R3F handles automatic disposal on unmount for standard components, but:
   - For programmatically created geometries/materials, call `.dispose()` when they are no longer needed.
   - Set `dispose={null}` on group wrappers when you want to explicitly override default disposal behaviors or manage nested asset caching.

## Physics & Interaction (Rapier)

7. **Rapier Colliders**: Keep collision physics simple. Use primitive shapes (e.g., `cuboid`, `ball`, `cylinder`) for colliders rather than complex trimesh shapes, which degrade performance.
8. **Physics Step Coherence**: Align physics modifications with the React Three Rapier simulation steps. Use programmatic body impulses (`applyImpulse`) rather than manual positioning where physics simulation is active.
